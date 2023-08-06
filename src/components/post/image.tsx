export default function Image(props: JSX.IntrinsicElements['img']) {
  return (
    <figure>
      {/* eslint-disable */}
      <img {...props} />
      <figcaption className="text-gray-400 text-xs mt-2">
        {props.alt}
      </figcaption>
      {/* eslint-enable */}
    </figure>
  )
}
