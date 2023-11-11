import './index.css';
import React, { CSSProperties, ChangeEvent, FC, ReactNode, useState } from 'react'

interface IDropdownMenuProps {
  menu: ReactNode;
  firstMenu?: ReactNode;
  menus: IMenus[];
}

interface IMenus {
  label: string;
  href: string;
  icon: any;
  onClick?: () => void;
}

interface IMaterialButtonProps {
  style: object;
  bgColor: string;
  textColor: string;
  icon?: any;
  title: string;
  fontSize?: string;
  onClick?: () => void;
}

interface IMaterialInputProps {
  label: string;
  type: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  rightElement?: ReactNode
}

interface IModalProps {
  visible: boolean;
  onClose: () => void;
  children: ReactNode
}

const Modal: FC<IModalProps> = (props) => {
  if (!props.visible) {
    return null;
  }
  return (
    <>
      <div className="modalFixedBg">
        <div style={{ position: "relative" }}>
          <div className="modalClose" onClick={props.onClose}>
            X
          </div>
          <div className="modalContainer">{props.children}</div>
        </div>
      </div>
    </>
  );
};

const MaterialInput: FC<IMaterialInputProps> = (props) => {
  const [focus, setFocus] = useState(props.value === "" ? false : true);
  const [touch, setTouch] = useState(false);

  return (
    <div className="materialInput">
      <label
        className={`label ${focus ? "focus" : ""}`}
        style={{
          top: 0,
          lineHeight: "none",
        }}
      >
        {props.label && `Enter ${props.label}`}
      </label>
      <div
        style={{
          display: "flex",
        }}
      >
        <input
          className="input"
          type={props.type}
          value={props.value}
          onChange={props.onChange}
          onFocus={(e) => {
            setFocus(true);
            setTouch(true);
          }}
          onBlur={(e) => {
            if (e.target.value === "") {
              setFocus(false);
            } else {
              setTouch(false);
            }
          }}
        />
        {props.rightElement ? props.rightElement : null}
      </div>
      {touch && (
        <div
          style={{
            fontSize: "10px",
            color: "red",
            fontWeight: 500,
          }}
        >{`${props.label} is Required`}</div>
      )}
    </div>
  );
};

const MaterialButton: FC<IMaterialButtonProps> = (props) => {
  const onClick = () => {
    props.onClick && props.onClick();
  };
  return (
    <div
      style={{
        width: "100%",
        ...props.style,
      }}
    >
      <button
        className="materialButton"
        style={{
          backgroundColor: props.bgColor,
          color: props.textColor,
          fontSize: props.fontSize,
        }}
        onClick={onClick}
      >
        {props.icon && props.icon}
        {props.title && props.title}
      </button>
    </div>
  );
};

const DropdownMenu: FC<IDropdownMenuProps> = (props) => {
  return (
    <div className="headerDropdownContainer">
      {props.menu}
      <div className="dropdown">
        <div className="upArrowContainer">
          <div className="upArrow"></div>
        </div>
        <div className="dropdownMenu">
          {props.firstMenu}
          <ul className="headerDropdownMenu">
            {props.menus &&
              props.menus.map((item, index) => (
                <li key={index}>
                  <a
                    onClick={(e) => {
                      if (item.onClick) {
                        e.preventDefault();
                        item.onClick && item.onClick();
                      }
                    }}
                    href={`${item.href}`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

interface ICardProps {
  children: ReactNode;
  headerleft?: ReactNode;
  headerright?: ReactNode;
  styles?: CSSProperties
}

const Card: FC<ICardProps> = (props) => {
  return (
    <div className="card" {...props} style={{ ...props.styles }}>
      {(props.headerleft || props.headerright) && (
        <div className="cardHeader">
          {props.headerleft && (
            <div
              style={{
                alignSelf: "center",
                fontSize: "20px",
                fontWeight: "500",
              }}
            >
              {props.headerleft}
            </div>
          )}
          {props.headerright && props.headerright}
        </div>
      )}

      {props.children}
    </div>
  )
}

export { Modal, MaterialInput, MaterialButton, DropdownMenu, Card }

