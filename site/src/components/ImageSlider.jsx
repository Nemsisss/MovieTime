import React from 'react'
import {useState} from 'react'
import '../styles/movielist.css'

const ImageSlider = ({slides}) => {
    const [currentIndex, setIndex] = useState(0);
    const hiddenStyle = {
        display: "None"
    }
    const sliderStyles = {
        height: "100%",
        position: "relative"
    }
    const slideStyles = {
        width: "100%",
        height: "100%",
        borderRadius: "10px",
        backgroundPosition: "center",
        backgroundSize: "100%",
        // backgroundImage: 'url(https://resizing.flixster.com/iWm6RYTryO1VXy8QpOa-flcHVT4=/300x300/v2/https://resizing.flixster.com/nV43zWXKk_bb490KEvG2WRqqBd4=/ems.cHJkLWVtcy1hc3NldHMvbW92aWVzL2IyMzI2MGIyLTIwZDEtNDUyNS1hZjJiLTViNTg3MDA1NTQxMy5qcGc=)'
    }
    const leftArrowStyles = {
        position: "absolute",
        top: "50%",
        transform: "translate(0, -50%)",
        left: "32px",
        fontSize: "45px",
        color: "black",
        zIndex: 1,
        cursor: "pointer"
    }
    const rightArrowStyles = {
        position: "absolute",
        top: "50%",
        transform: "translate(0, -50%)",
        right: "32px",
        fontSize: "45px",
        color: "black",
        zIndex: 1,
        cursor: "pointer"
    }
    const dotContainerStyles = {
        display: "flex",
        justifyContent: "center"
    }
    const dotStyles = {
        margin: "0 3px",
        cursor: 'pointer',
        fontSize: "40px"
    }
    const goToPrevious = () => {
        const isFirstSlide = currentIndex == 0;
        const newIndex = isFirstSlide ? slides.length - 1: currentIndex - 1;
        setIndex(newIndex);
    }

    const goToNext = () => {
        const isFirstSlide = currentIndex == slides.length - 1;
        const newIndex = isFirstSlide ? 0: currentIndex + 1;
        setIndex(newIndex);
    }
    const goToSlide = (slideIndex) => {
        setIndex(slideIndex);
    }
    return (
        <div className = "main-body" style = {sliderStyles}>
            <div style = {slideStyles} className = "movie-image-body" data-testid = "movie-image-body">
                <img className = "movie-image" alt = "image" src = {slides[currentIndex].image}/>
                <div className = "movie-hover">
                    <p className = "movie-plot">{slides[currentIndex].plot}</p>
                </div>
                <div className = "hidden-element" style = {hiddenStyle}>{currentIndex}</div>
                <div className = "movie-name">{slides[currentIndex].name}</div>
            </div>
            <div data-testid = "left-button" style = {leftArrowStyles} onClick = {goToPrevious}>&#8592;</div>
            <div data-testid = "right-button" style = {rightArrowStyles} onClick = {goToNext}>&#8594;</div>
            <div style = {dotContainerStyles}>
                {slides.map((slides, slideIndex) => (
                    <div className = {slideIndex} data-testid = "dot" key = {slideIndex} style = {dotStyles} onClick = {() => goToSlide(slideIndex)}>&#8226;</div>
                ))}
            </div>
        </div>
    )
}

export default ImageSlider