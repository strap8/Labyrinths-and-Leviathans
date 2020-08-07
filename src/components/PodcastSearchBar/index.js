import React, { useCallback, memo } from "react"
import PropTypes from "prop-types"
import { connect } from "../../store/provider"
import { InputGroup, InputGroupAddon, InputGroupText } from "reactstrap"
import { Link } from "react-router-dom"
import { RouteMap } from "../../store/reducers/router/actions"
import { SearchPodcasts } from "../../store/reducers/Podcasts/actions"
import { DebounceInput } from "../"
import "./styles.css"

const mapStateToProps = ({ Podcasts: { search }, Window: { isMobile } }) => ({
  isMobile,
  search,
})

const mapDispatchToProps = { SearchPodcasts }

const PodcastSearchBar = ({ search, SearchPodcasts, isMobile }) => {
  const handleSearch = useCallback(
    (searchValue) => SearchPodcasts(searchValue),
    []
  )

  return (
    <InputGroup
      className="PodcastSearchBar"
      style={{ maxWidth: isMobile ? "calc(100% - 52px)" : 360 }}
    >
      <InputGroupAddon
        addonType="prepend"
        className="TelescopeIconContainer Center"
      >
        <InputGroupText tag={Link} to={RouteMap.HOME}>
          <i className="fas fa-podcast PodcastIcon" />
        </InputGroupText>
      </InputGroupAddon>

      <DebounceInput
        value={search}
        placeholder="Search for podcasts"
        className="p-0"
        onChange={handleSearch}
      />
    </InputGroup>
  )
}

PodcastSearchBar.propTypes = {
  search: PropTypes.string,
  isMobile: PropTypes.bool,
  SearchPodcasts: PropTypes.func.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(memo(PodcastSearchBar))
