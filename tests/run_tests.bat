@echo off
cd c:\Users\epic\Documents\GitHub\Portfolio
start /B python -m http.server 8000
timeout /t 3 /nobreak >nul
python test_portfolio_simple.py