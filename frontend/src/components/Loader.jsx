import styled from "styled-components"
import { Spin } from "antd"


const Loader = () => {
  return (
    <StyledLoader>
      <Spin size="large" />
    </StyledLoader>
  )
}

export default Loader

const StyledLoader = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`