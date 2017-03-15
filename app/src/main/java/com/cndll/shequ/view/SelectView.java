package com.cndll.shequ.view;

import android.content.Context;
import android.graphics.Canvas;
import android.util.AttributeSet;
import android.view.MotionEvent;
import android.widget.ImageView;

import com.cndll.shequ.R;

/**
 * Created by kongqing on 17-3-14.
 */

public class SelectView extends ImageView {
    public boolean isSelect() {
        return isSelect;
    }

    public void setSelect(boolean select) {
        isSelect = select;
        post(new Runnable() {
            @Override
            public void run() {
                invalidate();
            }
        });
    }

    private boolean isSelect;

    public SelectView(Context context) {
        super(context);
    }

    public SelectView(Context context, AttributeSet attrs) {
        super(context, attrs);
    }

    public SelectView(Context context, AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
    }

    @Override
    protected void onDraw(Canvas canvas) {
        super.onDraw(canvas);
        if (isSelect) {
            setBackgroundResource(R.drawable.select);
        } else {
            setBackgroundResource(R.drawable.unselect);
        }
    }

    @Override
    public boolean onTouchEvent(MotionEvent event) {
        switch (event.getAction()) {
            case MotionEvent.ACTION_DOWN:
                if (isSelect) {
                    setSelect(false);
                } else {
                    setSelect(true);
                }
                return true;
        }
        return super.onTouchEvent(event);


    }
}
