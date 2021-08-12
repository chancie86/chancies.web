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
    singleImageContainer: {
        justifyContent: "center",
        width: 'auto',
    },
    singleImage: {
        maxWidth: "100%",
        height: "auto",
        borderRadius: "6px !important",
        boxShadow: "0 5px 15px -8px rgba(0, 0, 0, 0.24), 0 8px 10px -5px rgba(0, 0, 0, 0.2)",
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
        {imagesToRender.length === 1 ? (
            <Card className={classes.singleImageContainer}>
                <img src={imagesToRender[0].url} alt={imagesToRender[0].title} style={{ maxHeight: '30em' }} className={classes.singleImage} />
            </Card>
        ) : (
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
        )}
    </Grid>;
};

ImageCarousel.propTypes = {
    images: PropTypes.arrayOf(PropTypes.shape({
        path: PropTypes.string.isRequired,
        title: PropTypes.string,
    })).isRequired,
};
