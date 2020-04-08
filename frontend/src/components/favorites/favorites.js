import NavBar from '../navbar/navbar'
import React from 'react'
import './favorites.css'
import { Link } from 'react-router-dom'
import Modal from '../modal/modal_container'

    class Favorites extends React.Component {

        constructor(props) {
            super(props);
            this.state = {
                studyPalCafe: false
            }

            // let distance = this.props.YelpCafe.distance_away;
            // let noiseLevel = this.props.YelpCafe.noise_level;

            this.handleUnfavorite = this.handleUnfavorite.bind(this)
            this.handleFavorite = this.handleFavorite.bind(this)
            this.modalData = {
                // yelpData: this.props.yelpCafe,
                // distance,
                // noiseLevel,
                // user: this.props.user,
                // studyPalCafe: this.state.studyPalCafe,
                // filters: this.props.filters
                yelpData: {},
                distance: {},
                noiseLevel: {},
                studyPalCafe: {},
                filters: {},
                user: this.props.user
            }
            this.cafeClick = this.cafeClick.bind(this)
        }

        componentDidMount(){
            this.props.fetchFavorites(this.props.user.id);
        }

        handleFavorite(userId, cafe) {
            // data that is needed to update backend
            const favoriteData = new Object();
            favoriteData.type = "favorite";
            favoriteData.cafe = cafe;
            // this function updates cafe backend with +1 or -1 favorites
            this.props.updateFavorites(userId, favoriteData);
        }

        handleUnfavorite(userId,cafe){

            const favoriteData = new Object();
            favoriteData.type = "unfavorite";
            favoriteData.cafe = cafe;
            this.props.updateFavorites(userId, favoriteData);
            // this.state.switch ? this.state.switch = false : this.state.switch = true
        }

        cafeClick(cafe) {
            debugger
            this.props
              .fetchFavoriteCafeById(cafe.id)
              .then(() => this.props.fetchCurrCafe(cafe.id))
              .then(() =>
                this.props.openModal("favoriteModal", this.modalData)
              );
            debugger
        }

        render() {
            if (!this.props.favorites) return null;
            let favorites = this.props.favorites;

            return (
                <div className="favorites-page">  
                    <Modal/>
                    <NavBar 
                        status={true}
                    />
                    <div className="favorites-div">
                        <div className="back-profile-div">
                            <Link className="back-profile-header" to="/user">
                                <div className="back-arrow">&larr;</div> 
                                Back to Profile
                            </Link>
                        </div>
                        <div className="favorites-and-pick">
                            <div className="favorites-header">Favorites</div>
                            <button className="pick-random">Pick a Random Favorite Cafe</button>
                        </div>
                        <ul className="cafe-list">
                            {favorites.map(cafe => {
                                return (
                                    <div className="cafe-box">
                                        <div className="cafe-text-info">
                                            <div 
                                                className="modal-cafe-name"
                                                onClick={() => {
                                                   
                                                    this.cafeClick(cafe)
                                                    // this.props.openModal("cafe", this.modalData)
                                                    //     .then(() => this.cafeClick(cafe))

                                                    // this.props.fetchCurrCafe(this.props.yelpCafe.id)
                                                }}
                                            >
                                                {cafe.name}
                                            </div>
                                            <div className="modal-cafe-address">
                                                {/* {cafe.location.address1} */}
                                            </div>
                                            <div onClick={() => this.handleUnfavorite(this.props.user.id, cafe)} className="favorite-remove">Remove</div>
                                        </div>
                                        <img className="fav-cafe-img" src={cafe.image_url}/>
                                    </div>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            )
        }

    }

export default Favorites