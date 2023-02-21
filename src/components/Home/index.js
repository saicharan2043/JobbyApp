import Cookies from 'js-cookie'

import './index.css'

// import Hearder from '../Header'

const Home = props => {
  const clickJobs = () => {
    //   const {history} = props
    //   history.replace("/jobs")
    console.log('hello')
  }

  return (
    <div className="bg-image-home">
      {/* <Header /> */}
      <div className="text-container-home">
        <h1 className="heading-home">Find The Job That Fits Your Life</h1>
        <p className="discription-home">
          Millions of people are searching for jobs, salary information,company
          reviews. Find the job that fits your abilities and potential.
        </p>
        <button className="button-home" onClick={clickJobs}>
          Find Jobs
        </button>
      </div>
    </div>
  )
}
export default Home
