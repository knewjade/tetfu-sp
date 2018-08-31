import { h } from 'hyperapp';
import { i } from '@hyperapp/html';
import { Component, px, style } from '../../lib/types';

interface Props {
    width: number;
    iconName: string;
    sticky?: boolean;
    marginRight?: number;
    datatest?: string;
    key: string;
    colors: {
        baseClass: string;
        baseCode: string;
        darkCode: string;
    };
    actions: {
        onclick(): void;
    };
}

interface IconProps {
    height: number;
    fontSize: number;
    enable?: boolean;
    colors: {
        baseClass: string;
        baseCode: string;
        darkCode: string;
    };
}

export const ToolButton: Component<Props & IconProps> = (
    {
        height, width, fontSize, key, iconName, sticky = false, marginRight = 0,
        datatest, colors, enable = true, actions,
    },
) => {
    const aProperties = style({
        height: px(height),
        lineHeight: px(height),
        width: px(width),
        marginLeft: sticky ? 'auto' : undefined,
        position: sticky ? 'absolute' : undefined,
        right: sticky ? '10px' : undefined,
        marginRight: px(marginRight),
    });

    return (
        <a href="#"
           key={key}
           datatest={datatest}
           style={aProperties}
           onclick={() => actions.onclick()}>
            <Icon height={height} fontSize={fontSize} colors={colors} enable={enable}>{iconName}</Icon>
        </a>
    );
};

const Icon: Component<IconProps> = ({ height, fontSize, colors, enable }, children) => {
    const properties = style({
        display: 'block',
        fontSize: px(fontSize),
        height: px(height),
        lineHeight: px(height),
        width: '100%',
        border: 'solid 1px ' + (enable ? colors.darkCode : colors.baseCode),
        boxSizing: 'border-box',
        textAlign: 'center',
        cursor: 'pointer',
        color: '#fff',
    });

    const className = `material-icons darken-${enable ? 3 : 1} ${colors.baseClass}`;

    return <i className={className} style={properties}>{enable ? children : ''}</i>;
};
