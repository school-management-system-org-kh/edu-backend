import { Button } from 'antd'

const RoundButton = props => {
    const {
        marginTop,
        background,
        borderColor,
        borderRadius,
        width,
        fontFamily,
        fontWeight,
        fontSize,
        marginBottom,
        height,
        className, 
        marginLeft,
        disabled,
        cursor,
        whiteSpace
    } = props
    return <Button
        {...props}
        size="sm" 
        variant="primary"
        disabled = {disabled ? disabled : false}
        style={{
            marginTop: marginTop ? marginTop : '',
            background: background ? background : '#1890ff',
            borderColor: borderColor ? borderColor : '#1890ff',
            borderRadius: borderRadius ? borderRadius : '',
            width: width ? width : props.width ? props.width : '',
            fontFamily: fontFamily ? fontFamily : '',
            fontWeight: fontWeight ? fontWeight : '',
            fontSize: fontSize ? fontSize : '',
            marginBottom: marginBottom ? marginBottom : '',
            height: height ? height : '2.5rem',
            marginLeft: marginLeft ? marginLeft : '',
            whiteSpace: whiteSpace ? whiteSpace  : '',
            cursor: disabled ? 'not-allowed' : (cursor || 'pointer'),
        }}
        className={`${className}`}
        >{props.title}</Button>
}

export const RoundButtonCancel = props => {
    const {
        marginTop,
        background,
        borderColor,
        borderRadius,
        width,
        fontFamily,
        fontWeight,
        fontSize,
        marginBottom,
        height,
        color,
        className,
        whiteSpace 
    } = props
    return <Button
        {...props}
        size="sm" 
        variant="primary"
        style={{
            marginTop: marginTop ? marginTop : '',
            color: color ? color : 'black',
            background: background ? background : '#fff',
            borderColor: borderColor ? borderColor : '#d9d9d9',
            borderRadius: borderRadius ? borderRadius : '',
            width: width ? width : props.width ? props.width : '',
            fontFamily: fontFamily ? fontFamily : 'Montserrat',
            fontWeight: fontWeight ? fontWeight : '',
            fontSize: fontSize ? fontSize : '',
            marginBottom: marginBottom ? marginBottom : '',
            height: height ? height : '2.5rem',
            whiteSpace: whiteSpace ? whiteSpace  : '',
        }}
        className={`text-skhsk ${className}`}
        >{props.title}</Button>
}

export default RoundButton;