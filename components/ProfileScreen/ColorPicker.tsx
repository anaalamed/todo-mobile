import React from 'react';
import styled from 'styled-components/native';
import { StyledText } from '../../constants/StyledComponents';
import { ColorPicker, fromHsv } from 'react-native-color-picker'

interface Props {
    setColor(boolean): void
    currentColor?: string
}

const Picker: React.FC<Props> = ({ setColor, currentColor }) => {

    const colorsArr = ["lightcyan", "lightblue", "beige", "darkkhaki", "cadetblue"];

    return (
        <>
            <StyledText style={{ marginTop: 15 }}>Choose Background color for todos page! </StyledText>
            <ColorPicker
                onColorChange={color => setColor(fromHsv(color))}
                style={{ flex: 1, width: 100, height: 100 }}
                hideSliders={true}
                defaultColor={currentColor}
                color={currentColor}
            />
        </>
    )
}

export default Picker;

const Box = styled.View`
  flex-direction: row;
  margin-bottom: 10px;
`

const Button = styled.TouchableOpacity`
  width: 30px;
  height: 25px;
  border: 2px solid navy;
  border-color: ${(props) => props.border ? "red" : 'navy'};
`




