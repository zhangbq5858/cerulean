import React from 'react';
import Button from './Button';

const UrlList = ({ Link, buttonClickFunc, user }) => {
	// console.log("urllist part data check -> ", buttonClickFunc);

	const urlShowLength = 50;

	const clickFunc = (text) =>  {
		return buttonClickFunc(text, Link.id, user.id);
	};

	const voteOrUnvote = () => {
		if(user.votedUrls.includes(Link.id)){
			return "unvote";
		}
		return "vote";
	}

	const shortUrl = (url) => {
		if(url.length > urlShowLength){
			return url.slice(0,urlShowLength - 3) + "...";
		}
		return url;
	}

	return (
		<li>
			<h4>{Link.title}</h4>
			<a href={Link.url}>{shortUrl(Link.url)}</a>
			<span style={{color: "green"}}> {Link.tags?Link.tags.map((tag) => tag+" "):''} </span>
			<span>vote: {Link.vote} </span>
			<Button
				clickFunc={clickFunc}
				text={voteOrUnvote()}
			/>
			<Button
				clickFunc={clickFunc}
				text={"edit"}
			/>
			<Button
				clickFunc={clickFunc}
				text={"delete"}
			/>
			<p>{Link.summary}</p>
			<hr/>
		</li>
	);
};

export default UrlList;
