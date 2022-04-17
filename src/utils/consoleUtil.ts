export const consoleUtil = (desc:any) => {
    
    const env = process.env.NODE_ENV;
    
    if (env == 'development'){
        console.log(desc)
    }
    
}