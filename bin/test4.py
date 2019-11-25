import numpy as np


def get_states(interval,states,states_intervals_array):
    positions = np.searchsorted(states_intervals_array, interval)
    positions = np.clip(positions,0,len(states_intervals_array)-1)
    unique_positions = np.unique(positions)
    state_indices = np.arange(unique_positions.min(),unique_positions.max()+1,1)
    return ','.join(np.unique(states[state_indices]).astype(str))

## Setting variables that you will get from the df

states = np.asarray([1,2,1,2,3,1,2,4,1,2,4])
states_intervals_matrix = np.asarray([
    [0,10],
    [10,20],
    [20,30],
    [20, 30],
    [30, 40],
    [40, 50],
    [50, 60],
    [60, 70],
    [70, 80],
    [80, 90],
    [90, 100]

])
measurement_intervals = np.asarray([
    [22, 84],
    [88, 89],
    [98, 110]
])


## Transforming the matrix to array once instead of inside the loop
state_intervals_array = np.unique(states_intervals_matrix.flatten())
qq = np.apply_along_axis(get_states,1, measurement_intervals, states = states, states_intervals_array = state_intervals_array)
print (qq)


