
```bash
$ npm install
```

## Reference
```bash
https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ConnectToPostgreSQLInstance.html#USER_ConnectToPostgreSQLInstance.Troubleshooting-timeout
```

```set
aws ecr get-login-password

aws ecr get-login-password \
    --region <region> \
| docker login \
    --username AWS \
    --password-stdin <aws_account_id>.dkr.ecr.<region>.amazonaws.com
    
docker tag <repository> <aws_account_id>.dkr.ecr.<region>.amazonaws.com/(repository)

docker push <aws_account_id>.dkr.ecr.<region>.amazonaws.com/(repository)
```


