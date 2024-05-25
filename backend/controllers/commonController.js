const handleErrors = (res, error, statusCode = 500, defaultMessage = 'Internal Server Error') => {
    // Log the error with more context
    console.error({
        message: error.message,
        stack: error.stack,
        additionalInfo: error.additionalInfo || 'No additional information',
    });

    // Determine if the application is running in development mode
    const isDevelopment = process.env.NODE_ENV === 'development';

    // Prepare the error response
    const errorResponse = {
        error: isDevelopment ? error.message : defaultMessage,
        ...(isDevelopment && { stack: error.stack }), // Include stack trace only in development
    };

    // Send the error response
    res.status(statusCode).json(errorResponse);
};

export default handleErrors;
