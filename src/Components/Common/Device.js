import { Box, Flex, Progress, Switch, Text } from '@chakra-ui/react';
import React from 'react'
import { FaPlug } from "react-icons/fa";
import { ImSwitch } from "react-icons/im";


const Device = (props) => {
    const {deviceId, deviceType, status, deviceName, isLoading,disabledState} = props;
    console.log(props);
  return (
    <Box
    
        key={deviceId}
        boxShadow="dark-lg"
        p="6"
        my="5"
        py="5"
        rounded="md"
        bg={disabledState ? "#ffa07a" : "white"}
      >
        <Flex justifyContent={"space-between"}>
          <Box
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            {deviceType === "plug" ? (
              <FaPlug
              isDisabled={disabledState}
                color={status ? "green" : "red"}
                style={{ paddingRight: 5 }}
              />
            ) : (
              <ImSwitch
              isDisabled={disabledState}
                color={status ? "green" : "red"}
                style={{ paddingRight: 5 }}
              />
            )}
            <Text> {deviceName}</Text>
          </Box>
          <Switch
            onChange={props.onChangeState}
            isDisabled={disabledState}
            isChecked={status}
            id="device-status"
          />
        </Flex>
        {isLoading && <Progress size="xs" isIndeterminate />}
      </Box>
  )
}

export default Device