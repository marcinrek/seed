const up = () => state => ({ 
    count: state.count + 1, 
    ncount: state.ncount -1 }
);

export default up;
