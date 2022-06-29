import { StyledImageWrapper, StyledImageWrapperProps } from './index.styled'

interface ImageProps extends StyledImageWrapperProps {
  src: string
  alt: string
}

export default function Image({
  src,
  alt,
  width = 'auto',
  height = 'auto',
  ...rest
}: ImageProps): JSX.Element {
  return (
    <StyledImageWrapper width={width} height={height}>
      <img src={src} alt={alt} {...rest} />
    </StyledImageWrapper>
  )
}
