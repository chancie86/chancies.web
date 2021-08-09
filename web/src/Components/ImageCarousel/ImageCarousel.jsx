import React from "react";
import PropTypes from "prop-types";
import Carousel from "react-slick";

import { useSelector } from "react-redux";

import { makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

import Card from "../Card/Card";

const useStyles = makeStyles({
    container: {
        justifyContent: "center"
    },
    imageContainer: {
        display: "flex",
        justifyContent: "center"
    }
});

const getImages = (images, references) => {
    const result = [];

    images.forEach(x => {
        if (references[x.path]) {
            result.push({
                path: x.path,
                url: references[x.path],
                title: x.title
            });
        }
    });

    return result;
};

export default function ImageCarousel({ images }) {
    const classes = useStyles();

    const carouselSettings = {
        autoplay: true,
        autoplaySpeed: 15000,
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
      };

    const imageReferences = useSelector(state => state.document?.imageReferences);
    const imagesToRender = getImages(images, imageReferences);

    return <Grid container className={classes.container}>
        <Grid item xs={12} sm={12} md={9}>
            <Card carousel style={{ backgroundColor: "black" }}>
                <Carousel {...carouselSettings}>
                    {imagesToRender.map(x => <div key={x.path}>
                        <img src={x.url} alt={x.title} className="slick-image" />
                        <div className="slick-caption">
                            <h4>{x.title}</h4>
                        </div>
                    </div>)}
                </Carousel>
            </Card>
        </Grid>
    </Grid>;
};

ImageCarousel.propTypes = {
    images: PropTypes.arrayOf(PropTypes.shape({
        path: PropTypes.string.isRequired,
        title: PropTypes.string,
    })).isRequired,
};
