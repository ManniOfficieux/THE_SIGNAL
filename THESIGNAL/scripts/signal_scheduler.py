from datetime import datetime, timedelta

def next_signal(start_date, interval_days=21):
    base = datetime.strptime(start_date, "%Y-%m-%d")
    today = datetime.today()
    diff = (today - base).days
    cycles = diff // interval_days
    next_date = base + timedelta(days=(cycles + 1) * interval_days)
    return next_date.strftime("%Y-%m-%d")
