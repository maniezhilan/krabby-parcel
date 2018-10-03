import React from "react";
import pf from "petfinder-client";
import Pet from "../Pet/Pet.js";
import classNames from "classnames";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";


const styles = theme => ({
    appBar: {
        position: 'relative',
    },
    icon: {
        marginRight: theme.spacing.unit * 2,
    },
    heroUnit: {
        backgroundColor: theme.palette.background.paper,
    },
    heroContent: {
        maxWidth: 600,
        margin: '0 auto',
        padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
    },
    heroButtons: {
        marginTop: theme.spacing.unit * 4,
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
            width: 1100,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    cardGrid: {
        padding: `${theme.spacing.unit * 8}px 0`,
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing.unit * 6,
    },
});


const petfinder = pf({
    key: process.env.API_KEY,
    secret: process.env.API_SECRET
});

class Results extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            pets: []
        };
    }
    componentDidMount() {
        petfinder.pet
            .find({ location: "Austin, TX", output: "full" })
            .then(data => {
                let pets;
                if (data.petfinder.pets && data.petfinder.pets.pet) {
                    if (Array.isArray(data.petfinder.pets.pet)) {
                        pets = data.petfinder.pets.pet;
                    } else {
                        pets = [data.petfinder.pets.pet];
                    }
                } else {
                    pets = [];
                }
                this.setState({
                    pets: pets
                });
            });
    }
    render() {
            const { classes } = this.props;

            return (
            <div className={classNames(classes.layout, classes.cardGrid)}>
                {/* End hero unit */}
                <Grid container spacing={40}>
                    {this.state.pets.map(pet =>
                        {
                            let breed;
                            if (Array.isArray(pet.breeds.breed)) {
                                breed = pet.breeds.breed.join(", ");
                            } else {
                                breed = pet.breeds.breed;
                            }
                            return (
                                <Pet
                                    animal={pet.animal}
                                    key={pet.id}
                                    name={pet.name}
                                    breed={breed}
                                    media={pet.media}
                                    location={`${pet.contact.city}, ${pet.contact.state}`}
                                    id={pet.id}
                                    classes={classes}
                                />
                            );
                        }

                    )}
                </Grid>
            </div>
            );
    }
}

export default withStyles(styles)(Results);
