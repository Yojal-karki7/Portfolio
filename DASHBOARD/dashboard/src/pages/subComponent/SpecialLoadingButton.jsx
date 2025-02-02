import { Button, Spinner } from "flowbite-react";
import React from 'react'

const SpecialLoadingButton = ({content, width}) => {
  return (
    <>
      <Button className={width ? `${width}` :  'w-full'}>
        <Spinner aria-label="Spinner button example" size="sm" />
        <span className="pl-3">{content}</span>
      </Button>
    </>
  )
}

export default SpecialLoadingButton
