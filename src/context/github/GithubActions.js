import axios from 'axios';

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

// console.log(`URL: ${GITHUB_URL}, TOKEN: ${GITHUB_TOKEN}`)

// Create a instance of axios (BaseUrl and Headers can be accessed anytime with the const github)
const github = axios.create({
	baseURL: GITHUB_URL,
	headers: {
		Authorization: `token ${GITHUB_TOKEN}`,
	},
});

// Get search results
export const searchUsers = async text => {
	// set search params to what's being passed on the form (text)
	const params = new URLSearchParams({
		q: text,
	});

	const response = await github.get(`/search/users?${params}`);

	const items = response.data.items;

	if (items.length === 0) {
		window.location = '/notfound';
	}

	return items;
};

// Get User and Repos
export const getUserAndRepos = async login => {
	const params = new URLSearchParams({
		per_page: 10,
	});
	const [user, repos] = await Promise.all([
		github.get(`/users/${login}`),
		github.get(`users/${login}/repos?${params}`),
	]);

	if (user.status === 404) {
		window.location = '/notfound';
	} else {
		return {
			user: user.data,
			repos: repos.data,
		};
	}
};
