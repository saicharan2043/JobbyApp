import {Component} from 'react'

import Cookies from 'js-cookie'

import Header from '../Header'

// const EmploymentTypes = (props) =>{
//     const {employmentList} = props
//     const {label , employmentTypeId} = employmentList
//     return(
//         <li className="">
//             <input type="checkbox" className="" id={employmentTypeId}/>
//             <label className="" htmlFor={employmentTypeId}>{label}</label>
//         </li>
//     )
// }

// const RedioButton = (props) =>{
//     const {salaryList} = props
//     const {label , salaryRangeId} = salaryList
//     return(
//         <li className="">
//             <input type="redio" className="" id={salaryRangeId} name="salary"/>
//             <label className="" htmlFor={salaryRangeId}>{label}</label>
//         </li>
//     )
// }

const profileStatus = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

const jobsStatus = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class Jobs extends Component {
  state = {
    jobsList: [],
    profileData: [],
    StatusOfJobs: jobsStatus.loading,
    StatusOfProfile: profileStatus.loading,
  }

  componentDidMount() {
    this.getProfileData()
    this.getJobsData()
  }

  getProfileFail = () => {
    const onRetry = () => {
      this.getProfileData()
    }

    return (
      <div className="">
        <button className="" onClick={onRetry}>
          Retry
        </button>
      </div>
    )
  }

  getProfileData = async () => {
    this.setState({StatusOfProfile: profileStatus.loading})

    const JwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${JwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const profileDetails = {...data.profile_details}
      const updatedData = {
        profileImageUrl: profileDetails.profile_image_url,
        name: profileDetails.name,
        shortBio: profileDetails.short_bio,
      }

      this.setState({
        profileData: updatedData,
        StatusOfProfile: profileStatus.success,
      })
    } else {
      this.setState({StatusOfProfile: profileStatus.failure})
    }
  }

  getJobsData = async () => {
    this.setState({StatusOfJobs: jobsStatus.loading})

    const JwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/jobs'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${JwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.jobs.map(echValue => ({
        companyLogoUrl: echValue.company_logo_url,
        employmentType: echValue.employment_type,
        jobDescription: echValue.job_description,
        location: echValue.location,
        packagePerAnnum: echValue.package_per_annum,
        rating: echValue.rating,
        title: echValue.title,
      }))
      console.log(updatedData)
    }
  }

  render() {
    const {employmentTypesList, salaryRangesList} = this.props
    const {jobsList, profileData} = this.state
    const {profileImageUrl, name, shortBio} = profileData

    return (
      <>
        <h1>hello</h1>
        {/* <div className="">
                    <div className="">
                        <input type="search" className="" placeholder="Search"/>
                        <div className="">
                            <img src={profileImageUrl} alt="" className=""/>
                            <h1 className="">{name}</h1>
                            <p classNames="">{shortBio}</p>
                        </div>
                        <hr className=""/>
                        <h1 className="">Type of Employment</h1>
                        <ul className="">
                            {employmentTypesList.map((echValue) => (
                                <EmploymentTypes employmentList={echValue} key={echValue.employmentTypeId}/>
                            ))}
                        </ul>
                        <hr className=""/>
                        <h1 className="">Salary Range</h1>
                        <ul className="">
                            {salaryRangesList.map((echValue) =>(
                                <RedioButton salaryList={echValue} key={echValue.salaryRangeId}/>
                            ))}
                        </ul>

                        <ul className="">
                            {jobsList.map((echValue) =>(
                                <JobCard cardOfJob={echValue}/>
                            ))}
                        </ul>
                    </div>




                    <div className="">
                        <input type="search" className="" placeholder="Search"/>
                        <ul className="">
                            {jobsList.map((echValue) =>(
                                <JobCard cardOfJob={echValue}/>
                            ))}
                        </ul>
                    </div>
                </div> */}
      </>
    )
  }
}

export default Jobs
