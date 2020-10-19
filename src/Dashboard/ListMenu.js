import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import Typography from '@material-ui/core/Typography';
import Label from '@material-ui/icons/Label';
import InfoIcon from '@material-ui/icons/Info';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { NavLink } from "react-router-dom";

import HomeWorkIcon from '@material-ui/icons/HomeWork';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import ViewCarouselIcon from '@material-ui/icons/ViewCarousel';
import ContactPhoneIcon from '@material-ui/icons/ContactPhone';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import CategoryIcon from '@material-ui/icons/Category';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import AcUnitIcon from '@material-ui/icons/AcUnit';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
const useTreeItemStyles = makeStyles(theme => ({
  root: {
    color: theme.palette.text.secondary,
    '&:focus > $content': {
      backgroundColor: `var(--tree-view-bg-color, ${theme.palette.grey[400]})`,
      color: 'var(--tree-view-color)',
    },
  },
  content: {
    color: theme.palette.text.secondary,
    borderTopRightRadius: theme.spacing(2),
    borderBottomRightRadius: theme.spacing(2),
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    '$expanded > &': {
      fontWeight: theme.typography.fontWeightRegular,
    },
  },
  group: {
    marginLeft: 0,
    '& $content': {
      paddingLeft: theme.spacing(2),
    },
  },
  expanded: {},
  label: {
    fontWeight: 'inherit',
    color: 'inherit',
  },
  labelRoot: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1.5, 0),
  },
  labelIcon: {
    marginRight: theme.spacing(1),
  },
  labelText: {
    fontWeight: 'inherit',
    flexGrow: 1,
  },
}));

function StyledTreeItem(props) {
  const classes = useTreeItemStyles();
  const { labelText, labelIcon: LabelIcon, labelInfo, color, bgColor, ...other } = props;

  return (
    <TreeItem
      label={
        <div className={classes.labelRoot}>
          <LabelIcon color="inherit" className={classes.labelIcon} />
          <Typography variant="body2" className={classes.labelText}>
            {labelText}
          </Typography>
          <Typography variant="caption" color="inherit">
            {labelInfo}
          </Typography>
        </div>
      }
      style={{
        '--tree-view-color': color,
        '--tree-view-bg-color': bgColor,
      }}
      classes={{
        root: classes.root,
        content: classes.content,
        expanded: classes.expanded,
        group: classes.group,
        label: classes.label,
      }}
      {...other}
    />
  );
}

StyledTreeItem.propTypes = {
  bgColor: PropTypes.string,
  color: PropTypes.string,
  labelIcon: PropTypes.elementType.isRequired,
  labelInfo: PropTypes.string,
  labelText: PropTypes.string.isRequired,
};

const useStyles = makeStyles({
  root: {
    height: 264,
    flexGrow: 1,
    maxWidth: 400,
  },
});

export default function GmailTreeView() {
  const classes = useStyles();

  return (
    <TreeView
      className={classes.root}
      defaultExpanded={['3']}
      defaultCollapseIcon={<ArrowDropDownIcon />}
      defaultExpandIcon={<ArrowRightIcon />}
      defaultEndIcon={<div style={{ width: 24 }} />}
    >
      <NavLink to="/">
        <StyledTreeItem nodeId="1" labelText="Home" labelIcon={HomeWorkIcon} />
      </NavLink>
      <NavLink to="/books">
        <StyledTreeItem nodeId="1" labelText="Books" labelIcon={MenuBookIcon} />
      </NavLink>
      <NavLink to="/category">
        <StyledTreeItem nodeId="1" labelText="Category" labelIcon={CategoryIcon} />
      </NavLink>
      <NavLink to="/transactions">
        <StyledTreeItem nodeId="1" labelText="Transactions" labelIcon={MonetizationOnIcon} />
      </NavLink>
      <NavLink to="/token">
        <StyledTreeItem nodeId="1" labelText="L-Coin" labelIcon={AcUnitIcon} />
      </NavLink>
      <NavLink to="/user-management">
        <StyledTreeItem nodeId="1" labelText="User Management" labelIcon={AssignmentIndIcon} />
      </NavLink>
      <StyledTreeItem nodeId="3" labelText="Content Management" labelIcon={Label}>
        <NavLink to="/fax">
          <StyledTreeItem
            nodeId="5"
            labelText="Fax Data"
            labelIcon={LiveHelpIcon}
            color="#1a73e8"
            bgColor="#e8f0fe"
          />
        </NavLink>
        <NavLink to="/about">
          <StyledTreeItem
            nodeId="5"
            labelText="About Apps Data"
            labelIcon={InfoIcon}
            color="#1a73e8"
            bgColor="#e8f0fe"
          />
        </NavLink>
        <NavLink to="/contact">
          <StyledTreeItem
            nodeId="5"
            labelText="Contact Us Data"
            labelIcon={ContactPhoneIcon}
            color="#1a73e8"
            bgColor="#e8f0fe"
          />
        </NavLink>
        <NavLink to="/slider">
          <StyledTreeItem
            nodeId="5"
            labelText="Slider Data"
            labelIcon={ViewCarouselIcon}
            color="#1a73e8"
            bgColor="#e8f0fe"
          />
        </NavLink>
      </StyledTreeItem>
    </TreeView>
  );
}
