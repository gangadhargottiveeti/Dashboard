import React from 'react'

const TruncatedText = ({text, maxWords}) => {
    const words = text.split(' ')
    const truncatedText = words.slice(0,maxWords).join(' ')

  return (
    <p>
      {truncatedText}
      {words.length > maxWords && '...'}
    </p>
  )
}

export default TruncatedText
