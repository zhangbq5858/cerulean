import React from 'react';
import ListVoteButton from './ListVoteButton';
import ListEditButton from './ListEditButton';
import ListDeleteButton from './ListDeleteButton';

const UrlList = ({ LinksToDisplay, clickEditFunc }) => {
	const linksList = LinksToDisplay.map(({ title, url, tag, summary, voteNum },index) => {
		return (
			<li key={index}>
				<h4>{title}</h4>
				<a href={url}>{url}</a>
				<span style={{color: "green"}}> {tag} </span>
				<span>vote: {voteNum} </span>
				<ListVoteButton/>
				<ListEditButton onClick={this.clickEditFunc}/>
				<ListDeleteButton/>
				<p>{summary}</p>
				<hr/>
			</li>
		);
	});

	return (
		<ul className = "url-content">
			{linksList}
		</ul>
	);
};

export default UrlList;