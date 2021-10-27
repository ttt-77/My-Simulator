import numpy as np
import time

'''
Calculate x,y based on the generated array of the distribution.
-s: array of random generated number of the distribution
-bins: the number of bins
-count: the length of the array
-step: the forward steps of loop
'''
def calculation(s, bins, count, step):
    s = sorted(s)
    mi = s[0]
    ma = s[-1]
    dif = (ma - mi) / bins
    up = mi + dif
    y_index = 0
    s_index = 0
    y = np.zeros(100)
    while (s_index < 10000):
        if (s_index < 10000 - step and s[s_index] <= up and s[s_index + step - 1] <= up):
            y[y_index] = y[y_index] + step
            s_index = s_index + step
        else:
            while(s[s_index] > up and y_index < 99):
                up += dif
                y_index += 1
            y[y_index] += 1
            s_index += 1
    x = [mi + dif / 2 + dif * i for i in range(bins)]
    if dif == 0:
        y = y / bins
    else:
        y = y / (count * dif)
    return list(x), list(y)

def Norm(mu, sigma):
    Start = time.time()
    s = np.random.normal(mu, sigma, 10000)
    x,y = calculation(s, 100, 10000, 16)
    Time_C = time.time() - Start
    return x, y, Time_C

def Uniform(low, high):
    Start = time.time()
    s = np.random.uniform(low, high, 10000)
    x, y = calculation(s, 100, 10000, 14)
    Time_C = time.time() - Start
    return x, y, Time_C

def Gamma(shape, scale):
    Start = time.time()
    s = np.random.gamma(shape, scale, 10000)
    x, y = calculation(s, 100, 10000, 17)
    Time_C = time.time() - Start
    return x, y, Time_C