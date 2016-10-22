export class Puller {
    shell;
    dir: string;
    git_url: string;
    username: string;
    password: string;

    /**
     * Constructor
     * @param shell
     */
    public constructor(shell) {
        this.shell = shell;
        this.setDir('.');
    }

    /**
     * Set dir local
     * @param dir
     * @returns {Puller}
     */
    public setDir(dir) {
        this.dir = dir;

        return this;
    }

    /**
     * Set url git
     * @param url
     * @returns {Puller}
     */
    public set_url(url = '') {
        if (!url || url !== '') {
            return this;
        }

        this.git_url = url;
        return this;
    }

    /**
     * CD to dir local
     * @returns {boolean}
     */
    public cdDir() {
        var _shell = this.shell.cd(this.dir);

        if (_shell.code === 0) {
            return true;
        } else {
            console.log('No such directory');
            return false;
        }
    }

    /**
     * Pull git
     * @param origin
     * @returns {any}
     */
    public pull(origin = '') {
        var cd = this.cdDir();
        if (cd) {
            var _shell = this.shell.exec('git pull ' + origin);

            if (_shell.code !== 0) {
                console.log('Pull failed!');
            } else {
                console.log('Pull success!');
            }

            return _shell;
        }

        return null;
    }

    public exec(cmd = '') {
        if (!cmd.length) {
            return;
        }
        var cd = this.cdDir();
        if (cd) {
            var _shell = this.shell.exec(cmd);

            if (_shell.code !== 0) {
                console.log('Command failed!');
            } else {
                console.log('Command success!');
            }

            return _shell;
        }

        return null;
    }
}