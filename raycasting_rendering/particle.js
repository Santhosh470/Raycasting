
class Particle{
    constructor(){
        this.pos = createVector(sceneW/2, sceneH/2);
        this.rays = [];
        this.heading = 0;
        for(let i =-30; i< 30; i+=1){
            this.rays.push(new Ray(this.pos, radians(i)))

        }
    }
    rotate(angle){
        this.heading += angle;
        let index = 0;
        for(let i =-30; i< 30; i+=1){
            this.rays[index].setAngle(radians(i)+this.heading);
            index++;

        }

    }
    move(amt){
        const vel = p5.Vector.fromAngle(this.heading)
        vel.setMag(amt);
        this.pos.add(vel);


    }
    look(wall){
        let scene = []
        for(let ray of this.rays){
            let closest = null;
            let record = Infinity;
            for (let wall of walls){
                
                const pt = ray.cast(wall);
                if (pt){
                    const d = p5.Vector.dist(this.pos, pt);
                
                if(d< record){
                    record = d;
                    closest  = pt;
                }  
            }
        }
            if (closest){
                console.log("this")
                stroke(255,100)
                line(this.pos.x, this.pos.y, closest.x, closest.y)
                
            }
            scene.push(record);
        }
        return scene
    }
    update(x,y){
        this.pos.set(x,y);
    }
    show(){
        fill(255);
        ellipse(this.pos.x, this.pos.y, 4);
        for(let ray of this.rays){
            ray.show();
        }
    }
}