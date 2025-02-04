from __future__ import print_function
import os
from django.shortcuts import render, HttpResponse
import pandas as pd
def homepage(request):
    return render(request, 'index.html')

def stocks(request):
    res = 0
    if request.method == "POST":
        p = os.path.join(os.path.dirname(__file__), 'data.csv')
        df = pd.read_csv(p)
        data = list(map(int, request.POST.getlist('ans[]')))
        r = ''
        for i in range(len(data)):
            r += f'ans{i} == {data[i]} & '
        r = r[:-2]
        res = df.query(r)['res'].values
        return HttpResponse(res[0])
    return render(request, "index.html")