import React, { useState, lazy } from "react"
import { connect } from "../../store/provider"
import { RouteMap } from "../../store/reducers/router/actions"
import PropTypes from "prop-types"

import { useSwipeable } from "react-swipeable"
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  NavItem
} from "reactstrap"
import { AddToHomeScreen } from "../"
import Hamburger from "./Hamburger"
import NavItemLink from "./NavItemLink"
import "./styles.css"

const { ABOUT, HOME, CONTACT, PRIVACY_POLICY } = RouteMap

const mapStateToProps = ({ Window: { isMobile } }) => ({
  isMobile
})

const NavBar = ({ isMobile, prompt, promptToInstall }) => {
  const [collapsed, setCollapse] = useState(true)

  const navLinks = [
    {
      route: HOME,
      icon: (
        <span className="NavBarLink">
          <i className="fas fa-home NavBarImage" />
          HOME
        </span>
      )
    },
    {
      route: ABOUT,
      title: "ABOUT",
      icon: <i className="fas fa-info-circle NavBarImage" />
    },
    {
      route: CONTACT,
      title: "CONTACT",
      icon: <i className="fas fa-envelope NavBarImage" />
    },

    {
      icon: (
        <span className="NavBarLink">
          <i className="fas fa-ellipsis-v NavBarImage" />
        </span>
      ),
      links: [
        {
          dropdownItem: true,
          route: PRIVACY_POLICY,
          title: "PRIVACY POLICY",
          icon: <i className="fas fa-user-secret NavBarImage" />
        },
        {
          render: (
            <NavItem key="AddToHomeScreen" className="Center px-2 m-0">
              <AddToHomeScreen
                width="100%"
                prompt={prompt}
                promptToInstall={promptToInstall}
              />
            </NavItem>
          )
        }
      ]
    }
  ]

  const toggleHamburgerMenu = () => setCollapse(!collapsed)

  const closeHamburgerMenu = () => setCollapse(true)

  const renderDropDownMenu = (key, icon, links) => (
    <UncontrolledDropdown key={key} nav inNavbar tag="div">
      <DropdownToggle nav caret>
        {icon}
      </DropdownToggle>
      <DropdownMenu right>{renderNavLinks(links)}</DropdownMenu>
    </UncontrolledDropdown>
  )

  const renderNavLinks = (navLinks) =>
    navLinks.map((link, i) =>
      link.links ? (
        renderDropDownMenu(`Dropdown-${i}`, link.icon, link.links)
      ) : (
        <NavItemLink key={i} {...link} onClickCallback={closeHamburgerMenu} />
      )
    )

  const handlers = useSwipeable({
    onSwipedUp: () => setCollapse(true),
    onSwipedDown: () => setCollapse(false),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  })

  return (
    <div {...handlers}>
      <Navbar className="NavBar" fixed="top" expand="md">
        {isMobile && (
          <NavbarToggler
            tag={Hamburger}
            onClick={toggleHamburgerMenu}
            collapsed={collapsed}
          />
        )}
        <div style={{ height: 40 }} />
        <Collapse isOpen={!collapsed} navbar>
          <Nav className="ml-auto" navbar>
            {renderNavLinks(navLinks)}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  )
}

Navbar.propTypes = {}

export default connect(mapStateToProps)(NavBar)
