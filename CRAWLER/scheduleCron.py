from crontab import CronTab

my_cron = CronTab(user='nguyenchithanh')
job = my_cron.new(command='python writeDate.py')
job.minute.every(1)

my_cron.write()
