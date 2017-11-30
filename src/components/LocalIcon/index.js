import React from 'react';
import classNames from 'classnames';
import './index.less';

export default ({ type, colorful, className }) => {
  const propsClassName = className;
  const csSvg = classNames({
    'colorful-icon': true,
  }, {
    [`${propsClassName}`]: className !== undefined,
  });

  if (colorful) {
    return (
      <svg className={csSvg} aria-hidden="true">
        <use xlinkHref={`#sysuhikericon-${type}`} />
      </svg>
    );
  }

  const csFont = classNames({
    sysuhiker: true,
  }, {
    [`sysuhikericon-${type}`]: true,
  }, {
    [`${propsClassName}`]: className !== undefined,
  });
  return <i className={csFont} />;
};
