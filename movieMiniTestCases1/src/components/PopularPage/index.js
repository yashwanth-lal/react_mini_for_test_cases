import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'

import Header from '../Header/index'
import Footer from '../Footer/index'

import './index.css'

const status = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}
class PopularPage extends Component {
  state = {
    popularMoviesList: [],
    popularMoviesStatus: status.loading,
  }

  componentDidMount = () => {
    this.fetchPopularMovies()
  }

  popularMoviesCaseConverter = moviesList => {
    const pascalCasePopularMoviesList = moviesList.results.map(each => ({
      backdropPath: each.backdrop_path,
      id: each.id,
      overview: each.overview,
      posterPath: each.poster_path,
      title: each.title,
    }))

    this.setState({
      popularMoviesList: pascalCasePopularMoviesList,
      popularMoviesStatus: status.success,
    })
  }

  fetchPopularMovies = async () => {
    this.setState({popularMoviesStatus: status.loading})

    const jwtToken = Cookies.get('jwt_token')
    const popularMovieUrl = 'https://apis.ccbp.in/movies-app/popular-movies'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const fetchResponse = await fetch(popularMovieUrl, options)

    if (fetchResponse.ok) {
      const popularMoviesList = await fetchResponse.json()

      this.popularMoviesCaseConverter(popularMoviesList)
    } else {
      this.setState({popularMoviesStatus: status.failure})
    }
  }

  onLoading = () => (
    <div className="loader-container load2" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  onSuccess = () => {
    const {popularMoviesList} = this.state

    return (
      <ul className="popularDiv2">
        {popularMoviesList.map(each => (
          <li key={each.id}>
            <Link to={`/movies/${each.id}`}>
              <img
                className="popularImage"
                alt={each.title}
                src={each.posterPath}
              />
            </Link>
          </li>
        ))}
      </ul>
    )
  }

  onFailure = () => (
    <div className="popularFailureOuter">
      <img
        alt="failure view"
        className="popularFailImage"
        src="https://res.cloudinary.com/yash9676/image/upload/v1686830047/moviesAppMiniProjectCCBP/Background-Complete_u9yl7z.png"
      />
      <p>Something went wrong. Please try again</p>
      <button
        onClick={this.fetchPopularMovies}
        type="button"
        className="popularTryAgainButton"
      >
        Try Again
      </button>
    </div>
  )

  render() {
    const {popularMoviesStatus} = this.state
    return (
      <div className="popularPageOuter">
        <Header />
        {(() => {
          switch (popularMoviesStatus) {
            case status.loading:
              return this.onLoading()

            case status.success:
              return this.onSuccess()
            case status.failure:
              return this.onFailure()
            default:
              return null
          }
        })()}

        <Footer />
      </div>
    )
  }
}
export default PopularPage
