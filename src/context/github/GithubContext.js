import { createContext, useReducer } from 'react';
import githubReducer from './GithubReducer';

const GithubContext = createContext();

export const GithubProvider = ({ children }) => {
	const initialState = {
		users: [],
		user: {},
		repos: [],
		loading: false,
	};

	const [state, dispatch] = useReducer(githubReducer, initialState);

	return (
		<GithubContext.Provider
			value={{
				...state, //equals to passing each piece of state (users, user, repos, loading)
				dispatch,
			}}
		>
			{children}
		</GithubContext.Provider>
	);
};

export default GithubContext;
