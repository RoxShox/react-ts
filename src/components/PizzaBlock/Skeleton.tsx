import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = (props:any) => (
	<ContentLoader 
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#dad7d7"
    foregroundColor="#d3caca"
    {...props}
  >
    <circle cx="145" cy="125" r="125" /> 
    <rect x="0" y="271" rx="10" ry="10" width="280" height="27" /> 
    <rect x="0" y="317" rx="10" ry="10" width="280" height="82" /> 
    <rect x="0" y="423" rx="10" ry="10" width="90" height="30" /> 
    <rect x="129" y="423" rx="16" ry="16" width="152" height="30" />
  </ContentLoader>
)

export default Skeleton