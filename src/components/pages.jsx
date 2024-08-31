import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PageSelector = ({ accessToken, onPageSelect, setAccessPageToken }) => {
    const [pages, setPages] = useState([]);

    useEffect(() => {
        if (accessToken) {
            axios.get(`https://graph.facebook.com/me/accounts?access_token=${accessToken}`)
                .then(response => {
                    console.log(response.data.data)
                    setPages(response.data.data);
                })
                .catch(error => console.error('Error fetching pages:', error));
        }
    }, [accessToken]);

    return (
        <select onChange={(e) => {
            onPageSelect(e.target.value)
            setAccessPageToken(pages.find((page) => page.id === e.target.value))
        }}>
            <option value="">Select a Page</option>
            {pages.map(page => (
                <option key={page.id} value={page.id}>{page.name}</option>
            ))}
        </select>
    );
};

export default PageSelector;
