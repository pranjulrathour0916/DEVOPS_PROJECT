import {  TailSpin } from 'react-loader-spinner'

const Loader = () => {
  return (
      <div className='flex justify-center'>
        <TailSpin
  height={50}
  width={50}
  color="black"
  visible={true}
  ariaLabel="oval-loading"
  secondaryColor="red"
  strokeWidth={2}
  strokeWidthSecondary={2}
/>
      </div>

  )
}

export default Loader
