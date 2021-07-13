import React, { useRef, useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, CircularProgress } from '@material-ui/core';
import commonSFMessages from '../strings/common';

const iframeProps = {
  scrolling: 'no',
  allow: 'camera;microphone;gyroscope;accelerometer;',
};

const useStyles = makeStyles({
  full: {
    width: '100%',
    height: '100%',
  },
  borderNone: {
    border: 'none',
  },
  verticalCenter: {
    minHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  hidden: {
    visibility: 'hidden',
  },
});

export const PLAYER_STATE = {
  LOADED: 'onloaded',
};

const IndigoIframe = ({ src }) => {
  const intl = useIntl();
  const classes = useStyles();
  const iframeRef = useRef(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const url = useMemo(() => {
    try {
      return new URL(src);
    } catch (e) {
      setError(e);
    }
    return null;
  }, [src]);

  const handleMessageEvent = useCallback(
    (event) => {
      if (url?.origin === event.origin) {
        const hasLoaded = event.data.type.toLowerCase() === PLAYER_STATE.LOADED;
        setLoading(!hasLoaded);
      }
    },
    [url]
  );

  React.useEffect(() => {
    window.addEventListener('message', handleMessageEvent, false);

    return () => {
      window.removeEventListener('message', handleMessageEvent, false);
    };
  }, [handleMessageEvent]);

  if (error) {
    return (
      <Card>
        <CardContent data-testid="model-loading-error">
          {intl.formatMessage(commonSFMessages.loadingModelFailed)}
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      {isLoading && (
        <div
          data-testid="model-loading"
          className={classNames(classes.full, classes.verticalCenter)}
        >
            <CircularProgress />
        </div>
      )}
      <iframe
        ref={iframeRef}
        src={src}
        title="IndigoPlayer"
        className={classNames(classes.full, classes.borderNone, {
          [classes.hidden]: isLoading,
        })}
        {...iframeProps}
      />
    </>
  );
};

IndigoIframe.propTypes = {
  src: PropTypes.string.isRequired,
};

export default IndigoIframe;
