import React from 'react';
import { connect } from 'react-redux';

import { RepoCard, Loader, Dropdown } from '../../components';
import { DATES } from '../../constants/dates';
import { LANGUAGES } from '../../constants/languages';

import './Discover.scss';

@connect(
  ({ settings, trends }) => ({
    language: settings.language,
    dateRange: settings.dateRange,
    repos: trends.repos.data,
    loading: trends.repos.loading,
  }),
  ({ settings, trends }) => ({
    updateSettings: settings.updateSettings,
    fetchTrendingRepos: trends.fetchTrendingRepos,
  })
)
export class Discover extends React.Component {
  handleOptionChange = ({ name, value }) => {
    this.props.updateSettings({ key: name, value });
    this.props.fetchTrendingRepos();
  };

  render() {
    const { language, dateRange, repos, loading } = this.props;

    return (
      <div className="Discover">
        <div className="Discover__Actions">
          <Dropdown
            name="language"
            items={LANGUAGES}
            value={language}
            onChange={this.handleOptionChange}
          />
          <Dropdown
            name="dateRange"
            items={DATES}
            value={dateRange}
            onChange={this.handleOptionChange}
          />
        </div>
        <div className="Discover__ReposList">
          {loading ? (
            <Loader />
          ) : (
            repos.map(repo => <RepoCard key={repo.name} repo={repo} />)
          )}
        </div>
      </div>
    );
  }
}
