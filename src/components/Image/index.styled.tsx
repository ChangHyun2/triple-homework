import styled from '@emotion/styled'

export interface StyledImageWrapperProps {
  width?: string
  height?: string
}

export const StyledImageWrapper = styled.div<StyledImageWrapperProps>`
  ${({ width, height }) => `
    width: ${width};
    height: ${height};
  `}

  img {
    width: 100%;
    height: 100%;
  }
`
