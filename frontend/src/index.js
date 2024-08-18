import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { AuthProvider } from './contexts/AuthContext';
import { SettingsProvider } from './contexts/SettingsContext';
import { AppSelectionProvider } from './contexts/AppSelectionContext';

// Create an HTTP link
const httpLink = createHttpLink({
    uri: `${process.env.REACT_APP_API_URL || 'http://localhost:3000'}/graphql`,
});

// Create a middleware link to add the token to requests
const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('token');
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        }
    };
});

// Create Apollo Client with authLink and httpLink
const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ApolloProvider client={client}>
        <AuthProvider>
            <SettingsProvider>
                <AppSelectionProvider>
                    <App />
                </AppSelectionProvider>
            </SettingsProvider>
        </AuthProvider>
    </ApolloProvider>
);

