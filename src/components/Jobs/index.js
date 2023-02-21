import {BsSearch} from 'react-icons/bs'

import {Component} from 'react'

import Cookies from 'js-cookie'

import Header from '../Header'

import './index.css'

const EmploymentTypes = props => {
  const {employmentList} = props
  const {label, employmentTypeId} = employmentList
  return (
    <li className="list-of-checkbox">
      <input type="checkbox" className="checkbox" id={employmentTypeId} />
      <label className="label-checkbox" htmlFor={employmentTypeId}>
        {label}
      </label>
    </li>
  )
}

const RedioButton = props => {
  const {salaryList} = props
  const {label, salaryRangeId} = salaryList
  return (
    <li className="list-of-redio">
      <input type="radio" className="redio" id={salaryRangeId} name="salary" />
      <label className="label-redio" htmlFor={salaryRangeId}>
        {label}
      </label>
    </li>
  )
}

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

  getJobsFail = () => {
    const onRetry = () => {
      this.getJobsData()
    }

    return (
      <div className="">
        <img src="" alt="" className="" />
        <p className="">Oops! Something Went Wrong</p>
        <p className="">
          We cannot seem to find the page your are looking for.
        </p>
        <button className="" onClick={onRetry}>
          Retry
        </button>
      </div>
    )
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
      this.setState({jobsList: updatedData, StatusOfJobs: jobsStatus.success})
    } else {
      this.setState({StatusOfJobs: jobsStatus.failure})
    }
  }

  render() {
    const {employmentTypesList, salaryRangesList} = this.props
    const {jobsList, profileData} = this.state
    const {profileImageUrl, name, shortBio} = profileData

    return (
      <>
        <Header />
        <div className="bg-color-jobs">
          <div className="left-side-container">
            <div className="input-sm-container">
              <input
                type="search"
                className="input-sm-divice"
                placeholder="Search"
              />
              <div className="search-icon-container-sm">
                <BsSearch className="search-icon-sm" />
              </div>
            </div>
            <div className="profile-container">
              <img src={profileImageUrl} alt="" className="profile-img" />
              <h1 className="person-name">{name}</h1>
              <p className="bio">{shortBio}</p>
            </div>
            <hr className="hr" />
            <h1 className="employment-text">Type of Employment</h1>
            <ul className="checkbox-un-order-list">
              {employmentTypesList.map(echValue => (
                <EmploymentTypes
                  employmentList={echValue}
                  key={echValue.employmentTypeId}
                />
              ))}
            </ul>
            <hr className="hr" />
            <h1 className="salary-text">Salary Range</h1>
            <ul className="redio-un-order-list">
              {salaryRangesList.map(echValue => (
                <RedioButton
                  salaryList={echValue}
                  key={echValue.salaryRangeId}
                />
              ))}
            </ul>

            {/* <ul className="job-list-sm">
              {jobsList.map(echValue => (
                <JobCard cardOfJob={echValue} />
              ))}
            </ul> */}
          </div>

          <div className="right-side-container">
            <div className="input-container">
              <input
                type="search"
                className="input-divice"
                placeholder="Search"
              />
              <div className="search-icon-container">
                <BsSearch className="search-icon" />
              </div>
            </div>
            {/* <ul className="">
                            {jobsList.map((echValue) =>(
                                <JobCard cardOfJob={echValue}/>
                            ))}
                        </ul> */}
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
