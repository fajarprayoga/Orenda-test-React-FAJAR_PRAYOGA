import React, { useState } from 'react';

function Alert({ message = null, color = '' }) {
    return (
        <div
            className={`p-4 mb-4 text-sm  rounded-lg bg-${color}-50 dark:bg-gray-800 dark:text-blue-400`}
            role='alert'
        >
            <span className='font-medium'>Info alert!</span> {message}.
        </div>
    );
}

export default Alert;
