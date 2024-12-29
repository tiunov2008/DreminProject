from __future__ import print_function
import os
from django.shortcuts import render, HttpResponse
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score
import numpy as np
def homepage(request):
    return render(request, 'index.html')

def stocks(request):
    res = 0
    if request.method == "POST":
        p = os.path.join(os.path.dirname(__file__), 'data.csv')
        df = pd.read_csv(p)
        X = df.iloc[:, :-1].values
        y = df.iloc[:, -1].values
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
        model = LinearRegression()
        model.fit(X_train, y_train)
        y_test_pred = model.predict(X_test)
        test_mse = mean_squared_error(y_test, y_test_pred)
        test_r2 = r2_score(y_test, y_test_pred)
        input_data = np.array([list(map(int, request.POST.getlist('ans[]')))])
        predictions = model.predict(input_data)
        res = round(*predictions)
        return HttpResponse(res)
    return render(request, "index.html")