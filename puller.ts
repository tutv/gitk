class puller {
    shell;
    dir:string;
    git_url:string;
    username:string;
    password:string;

    public constructor(shell) {
        this.shell = shell;
        this.setDir('.');
    }

    public setDir(dir) {
        this.dir = dir;
    }

    public set_url(url = '') {
        if (!url || url !== '') {
            return;
        }

        this.git_url = url;
    }

    public pull(origin = '') {
        return this.shell.exec('git pull ' + origin);
    }
}