import React from "react"

const Open = ({data}: {data: Record<string, unknown>}) => {
  return (
    <div className="p-1 mt-6 border rounded ">
     {data?.icon as React.ReactNode}
    </div>
  )
}

export default Open
