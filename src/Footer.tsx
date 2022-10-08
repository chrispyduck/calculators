import { default as Grid } from "@mui/material/Unstable_Grid2/Grid2";
import { Box, Link, styled } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin, IconDefinition } from "@fortawesome/free-brands-svg-icons";

const FooterBox = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(3),
  fontSize: "80%",
}));

const SocialLink = styled(Link)(({ theme }) => ({
  margin: theme.spacing(0, 1),
}));
const SocialIcon = (props: { icon: IconDefinition, href: string, title: string }) => {
  return (
    <SocialLink href={props.href} title={props.title} color="inherit">
      <FontAwesomeIcon icon={props.icon} />
    </SocialLink>
  );
};

export default function Footer() {
  return (
    <FooterBox>
      <Grid container>
        <Grid sm={5} display="flex" justifyContent="left">
          Made by{' '}
          <Link href="https://chrispyduck.github.io" color="inherit">
            chrispyduck
          </Link>
          . No rights reserved.
        </Grid>
        <Grid sm={2} display="flex" justifyContent="center">
          <SocialIcon
            icon={faGithub}
            href="https://github.com/chrispyduck/calculators"
            title="GitHub"
          />
          <SocialIcon
            icon={faLinkedin}
            href="https://linkedin.com/in/chrispyduck"
            title="LinkedIn"
          />
        </Grid>
        <Grid sm={5} display="flex" justifyContent="right">
          Need a Software Architect?&nbsp;<Link href="https://chrispyduck.github.io/#/contact">Hire me!</Link>
        </Grid>
      </Grid>
    </FooterBox>
  );
};
