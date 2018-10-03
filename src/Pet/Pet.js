import React from "react";
import { Link } from "@reach/router";
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
    position: "relative"
  },
  icon: {
    marginRight: theme.spacing.unit * 2
  },
  heroUnit: {
    backgroundColor: theme.palette.background.paper
  },
  heroContent: {
    maxWidth: 600,
    margin: "0 auto",
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`
  },
  heroButtons: {
    marginTop: theme.spacing.unit * 4
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  cardGrid: {
    padding: `${theme.spacing.unit * 8}px 0`
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  cardMedia: {
    paddingTop: "56.25%" // 16:9
  },
  cardContent: {
    flexGrow: 1
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing.unit * 6
  }
});

class Pet extends React.Component {
    render() {
        const { name, animal, breed, media, location, id, classes } = this.props;
        let photos = [];
        if (media && media.photos && media.photos.photo) {
            photos = media.photos.photo.filter(photo => photo["@size"] === "pn");
        }

        let hero = "http://placecorgi.com/300/300";
        if (photos[0] && photos[0].value) {
            hero = photos[0].value;
        }

        return (
            // <Link to={`/details/${id}`} className="pet">
            //     <div className="image-container">
            //         <img src={hero} alt={name} />
            //     </div>
            //     <div className="info">
            //         <h1>{name}</h1>
            //         <h2>{`${animal} — ${breed} — ${location}`}</h2>
            //     </div>
            // </Link>
            <Grid item key={id} sm={6} md={4} lg={3}>
                <Card className={classes.card}>
                    <CardMedia
                        className={classes.cardMedia}
                        image={hero}
                        title={name}
                    />
                    <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant="headline" component="h2">
                            {name}
                        </Typography>
                        <Typography>
                             {breed} - {location}
                    </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" color="primary">
                            View
                    </Button>
                        <Button size="small" color="primary">
                            Edit
                    </Button>
                    </CardActions>
                </Card>
            </Grid>
        );
    }
}

export default Pet;
